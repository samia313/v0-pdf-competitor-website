export function AdBanner({ slot, className }: { slot: string; className?: string }) {
  return (
    <div className={`ad-container ${className || ''}`}>
      {/* 
        Google AdSense Code will go here
        Replace this with your actual AdSense code:
        
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      */}
      <span className="text-xs">Advertisement</span>
    </div>
  )
}

export function AdSidebar({ slot }: { slot: string }) {
  return (
    <div className="hidden lg:block w-[300px] shrink-0">
      <div className="sticky top-20">
        <div className="ad-container h-[600px]">
          {/* 
            Sidebar Ad (300x600 or responsive)
            Replace with your AdSense code
          */}
          <span className="text-xs">Advertisement</span>
        </div>
      </div>
    </div>
  )
}

export function AdInline({ slot }: { slot: string }) {
  return (
    <div className="my-8">
      <div className="ad-container min-h-[250px]">
        {/* 
          Inline/In-article Ad
          Replace with your AdSense code
        */}
        <span className="text-xs">Advertisement</span>
      </div>
    </div>
  )
}
