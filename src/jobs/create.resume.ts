import { client } from '@/trigger'
import { eventTrigger } from '@trigger.dev/sdk'
import { z } from 'zod'
// eslint-disable-next-line no-unused-vars
import { prompt } from '@/utils/openai'
// eslint-disable-next-line no-unused-vars
import { TCompany, TUserDetails } from '@/components/Home'
import { createResume } from '@/utils/resume'
import { Resend } from '@trigger.dev/resend'

const resend = new Resend({
  id: 'resend',
  apiKey: process.env.RESEND_API_KEY!,
})

// eslint-disable-next-line no-unused-vars
const companyDetails = (companies: TCompany[]) => {
  let stringText = ''
  for (let i = 1; i < companies.length; i++) {
    stringText += ` ${companies[i].companyName} as a ${companies[i].position} on technologies ${companies[i].technologies} for ${companies[i].workedYears} years.`
  }
  return stringText
}

client.defineJob({
  id: 'create-resume',
  name: 'Create Resume',
  version: '0.0.1',
  integrations: {
    resend,
  },
  trigger: eventTrigger({
    name: 'create.resume',
    schema: z.object({
      firstName: z.string(),
      lastName: z.string(),
      photo: z.string(),
      email: z.string().email(),
      companies: z.array(
        z.object({
          companyName: z.string(),
          position: z.string(),
          workedYears: z.string(),
          technologies: z.string(),
        }),
      ),
    }),
  }),
  // eslint-disable-next-line no-unused-vars
  run: async (payload, io, ctx) => {
    const texts = await io.runTask('openai-task', async () => {
      return Promise.all([
        await generateResumeText(
          prompts.profileSummary(
            payload.firstName,
            payload.companies[0].position,
            payload.companies[0].workedYears,
            payload.companies[0].technologies,
          ),
        ),
        await generateResumeText(
          prompts.jobResponsibilities(
            payload.firstName,
            payload.companies[0].position,
            payload.companies[0].workedYears,
            payload.companies[0].technologies,
          ),
        ),
        await generateResumeText(
          prompts.workHistory(
            payload.firstName,
            payload.companies[0].position,
            payload.companies[0].workedYears,
            payload.companies,
          ),
        ),
      ])
    })

    console.log('passed chatgpt')

    const pdf = await io.runTask('convert-to-html', async () => {
      const resume = createResume({
        userDetails: payload,
        picture: payload.photo,
        profileSummary: texts[0],
        jobResponsibilities: texts[1],
        workHistory: texts[2],
      })

      return { final: resume.split(',')[1] }
    })

    console.log('converted to pdf')

    await io.resend.sendEmail('send-email', {
      to: payload.email,
      subject: 'Resume',
      html: 'Your resume is attached!',
      attachments: [
        {
          filename: 'resume.pdf',
          content: Buffer.from(pdf.final, 'base64'),
          contentType: 'application/pdf',
        },
      ],
      from: 'Daryl <daryl@datametal.io>',
    })

    console.log('Sent email')
  },
})
