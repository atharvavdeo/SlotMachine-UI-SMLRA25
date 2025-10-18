import { Twitter, Facebook, Instagram, Share2 } from 'lucide-react';

interface SocialShareButtonsProps {
  show: boolean;
}

export function SocialShareButtons({ show }: SocialShareButtonsProps) {
  if (!show) return null;

  const handleShare = (platform: string) => {
    // Placeholder for share functionality
    console.log(`Sharing to ${platform}`);
  };

  const iconClass = "w-6 h-6";
  const buttonClass = "p-3 border-4 transition-all hover:scale-110 active:scale-95";

  return (
    <div className="flex gap-4 items-center justify-center">
      <button 
        onClick={() => handleShare('twitter')}
        className={`${buttonClass} bg-[#00ffff] border-[#00ffff] text-[#0a0014]`}
        style={{ boxShadow: '2px 2px 0 #00cccc' }}
      >
        <Twitter className={iconClass} />
      </button>
      
      <button 
        onClick={() => handleShare('facebook')}
        className={`${buttonClass} bg-[#ff00ff] border-[#ff00ff] text-white`}
        style={{ boxShadow: '2px 2px 0 #cc00cc' }}
      >
        <Facebook className={iconClass} />
      </button>
      
      <button 
        onClick={() => handleShare('instagram')}
        className={`${buttonClass} bg-[#ffff00] border-[#ffff00] text-[#0a0014]`}
        style={{ boxShadow: '2px 2px 0 #cccc00' }}
      >
        <Instagram className={iconClass} />
      </button>
      
      <button 
        onClick={() => handleShare('other')}
        className={`${buttonClass} bg-[#a020f0] border-[#a020f0] text-white`}
        style={{ boxShadow: '2px 2px 0 #7010c0' }}
      >
        <Share2 className={iconClass} />
      </button>
    </div>
  );
}
