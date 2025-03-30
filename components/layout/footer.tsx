import Link from "next/link";
import Logo from "../ui/logo";
import SocialMedia from "../ui/socialmedia";

const navitems = [
    { header: "Works", items: [
        { text: 'Enter ID', uri: '' },
        { text: 'Gallery', uri: '' }
    ]},
    { header: "Topic", items: [
        { text: 'Page', uri: '' },
        { text: 'Page', uri: '' },
        { text: 'Page', uri: '' },
    ]},
    { header: "Topic", items: [
        { text: 'Page', uri: '' },
        { text: 'Page', uri: '' },
        { text: 'Page', uri: '' },
    ]},
]

const smIconClass = "h-[20px]";

export default function Footer() {
    return (
        <div className="flex flex-row justify-between border-t-1 border-gray-300 mx-12 mb-7 pt-10 px-12">
            <div className="flex flex-col gap-2">
                <Logo size="30px" />
                <div className="flex flex-row justify-between">
                    <SocialMedia platform="facebook" className={smIconClass} />
                    <SocialMedia platform="youtube" className={smIconClass} />
                    <SocialMedia platform="linkedln" className={smIconClass} />
                    <SocialMedia platform="instagram" className={smIconClass} />
                </div>
            </div>
            <div className="flex flex-row justify-between w-2/5" >
                { navitems.map((col, i) => (
                    <div className="flex flex-col gap-3" key={i}>
                        <span className="font-roboto text-xs">{col.header}</span>
                        { col.items.map((item, i) => (
                            <Link className="font-inter text-xs hover:underline" href={item.uri} key={i}>
                                {item.text}
                            </Link>
                        )) }
                    </div>
                ) ) }
            </div>
        </div>
    )
}
