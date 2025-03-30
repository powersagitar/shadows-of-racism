import FacebookIcon from "../icons/facebook";
import InstagramIcon from "../icons/instagram";
import LinkedinIcon from "../icons/linkedin";
import YoutubeIcon from "../icons/youtube";

type SocialMediaProps = {
    platform: "facebook" | "instagram" | "linkedin" | "youtube";
    className?: string;
};

const links = {
    instagram: "",
    facebook: "",
    linkedin: "",
    youtube: "",
};

export default function SocialMedia({ platform, className }: SocialMediaProps) {
    const Icon = ({ className }: { className: string }) => {
        switch (platform) {
            case "facebook":
                return <FacebookIcon className={className} />;
            case "instagram":
                return <InstagramIcon className={className} />;
            case "linkedin":
                return <LinkedinIcon className={className} />;
            case "youtube":
                return <YoutubeIcon className={className} />;
        }
    };

    return (
        <a
            className={`items-center justify-center ${className}`}
            href={links[platform]}
        >
            <Icon className="w-full h-full" />
        </a>
    );
}
