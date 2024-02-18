import { OpenAI } from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function generateResumeText(prompt: string) {
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 250,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  })

  return response.choices[0].text.trim()
}

export const prompts = {
  profileSummary: (
    fullName: string,
    currentPosition: string,
    workingExperience: string,
    knownTechnologies: string,
  ) =>
    `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${workingExperience} years). \n I write in the technologies: ${knownTechnologies}. Can you write a 100 words description for the top of the resume(first person writing)?`,
  jobResponsibilities: (
    fullName: string,
    currentPosition: string,
    workingExperience: string,
    knownTechnologies: string,
  ) =>
    `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${workingExperience} years). \n I write in the technolegies: ${knownTechnologies}. Can you write 3 points for a resume on what I am good at?`,
  workHistory: (
    fullName: string,
    currentPosition: string,
    workingExperience: string,
    details: TCompany[],
  ) =>
    `I am writing a resume, my details are \n name: ${fullName} \n role: ${currentPosition} (${workingExperience} years). ${companyDetails(details)} \n Can you write me 50 words for each company seperated in numbers of my succession in the company (in first person)?`,
}
