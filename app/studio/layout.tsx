export default function StudioLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang='en'>
        <body className='antialiased' data-path='/studio'>
          {children}
        </body>
      </html>
    );
  }
  