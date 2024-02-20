export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='flex w-full flex-1 flex-col items-center'>
        <nav className='border-b-foreground/10 flex h-16 w-full justify-center border-b'>
          <div className='flex w-full max-w-6xl items-center justify-between p-3 text-sm'>
            <span className='select-none font-bold'>resumeGPT.</span>
          </div>
        </nav>

        <div className='animate-in flex max-w-6xl flex-1 flex-col px-3 opacity-0'>
          <Home />
        </div>
      </div>
    </main>
  )
}
