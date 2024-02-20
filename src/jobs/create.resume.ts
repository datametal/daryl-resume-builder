import { client } from '@/trigger'
import { eventTrigger } from '@trigger.dev/sdk'
import { z } from 'zod'
import { prompts } from '@/utils/openai'
// eslint-disable-next-line no-unused-vars
import { TCompany, TUserDetails } from '@/components/Home'

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
    // eslint-disable-next-line no-unused-vars
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
  },
})
