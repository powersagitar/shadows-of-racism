import FacebookIcon from "../icons/facebook";
import InstagramIcon from "../icons/instagram";
import LinkedlnIcon from "../icons/linkedln";
import YoutubeIcon from "../icons/youtube";

type SocialMediaProps = {
    platform: 
        'facebook' | 
        'instagram' | 
        'linkedln' |
        'youtube' 
    className?: string
}

const links = {
    instagram: '',
    facebook: '',
    linkedln: '',
    youtube: ''
}

export default function SocialMedia({ platform, className }: SocialMediaProps) {
    
    const Icon = ({ className }: { className:string }) => {
        switch (platform) {
            case 'facebook': return <FacebookIcon className={className} />
            case 'instagram': return <InstagramIcon className={className} />
            case 'linkedln': return <LinkedlnIcon className={className} />
            case 'youtube': return <YoutubeIcon className={className} />
        }
    };

    return (
        <a className={`items-center justify-center ${className}`}>
            <Icon className="w-full h-full" />
        </a>
    )

}
