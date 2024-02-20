import { TUserDetails } from '@/components/Home'
import { jsPDF } from 'jspdf'

type ResumeProps = {
  userDetails: TUserDetails
  picture: string
  profileSummary: string
  workHistory: string
  jobResponsibilities: string
}

export function createResume({
  userDetails,
  picture,
  workHistory,
  jobResponsibilities,
  profileSummary,
}: ResumeProps) {
  const doc = new jsPDF()

  // Title block
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')

  doc.text(userDetails.firstName + ' ' + userDetails.lastName, 45, 27)
  doc.setLineWidth(0.5)
  doc.rect(20, 15, 170, 20) // x, y, width, height
  doc.addImage({
    imageData: picture,
    x: 25,
    y: 17,
    width: 15,
    height: 15,
  })

  // Reset font for the rest
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')

  // Personal Information block
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Summary', 20, 50)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const splitText = doc.splitTextToSize(profileSummary, 170)
  doc.text(splitText, 20, 60)

  const newY = splitText.length * 5

  // Work history block
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Work History', 20, newY + 65)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const splitWork = doc.splitTextToSize(workHistory, 170)
  doc.text(splitWork, 20, newY + 75)

  const newNewY = splitWork.length * 5

  // Job Responsibilities block
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('Job Responsibilities', 20, newY + newNewY + 75)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'normal')
  const splitJob = doc.splitTextToSize(jobResponsibilities, 170)
  doc.text(splitJob, 20, newY + newNewY + 85)

  return doc.output('datauristring')
}
