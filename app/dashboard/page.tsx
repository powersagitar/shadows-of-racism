'use client'

import Button from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import DatePicker from "@/components/ui/datepicker";
import { Dialog, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import SkeletonImage from "@/components/ui/skeletonimage";
import { CheckedState } from "@radix-ui/react-checkbox";
import { format } from "date-fns";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"

export type Artwork = {
    name: string,
    artist: string,
    medium: string,
    creationDate: Date,
    description: string,
    dimension: {
        h: number,
        w: number,
        d?: number
    },
    image: URL,
    id: string
}

type UserData = {
    name: string,
    remaining: number,
    students: number,
    items: number,
    artworks: Artwork[]
}

const testArtworks = [
    { name: 'Skibidi Toilet', artist: 'Mohan Dong' },
    { name: 'Fanum Tax', artist: 'Paste' },
    { name: 'Insanity Maxxing', artist: 'fluf' },
    { name: 'Skibidi Toilet', artist: 'Mohan Dong' },
    { name: 'Fanum Tax', artist: 'Paste' },
    { name: 'Insanity Maxxing', artist: 'fluf' },
    { name: 'Skibidi Toilet', artist: 'Mohan Dong' },
    { name: 'Fanum Tax', artist: 'Paste' },
    { name: 'Insanity Maxxing', artist: 'fluf' },
    { name: 'Skibidi Toilet', artist: 'Mohan Dong' },
    { name: 'Fanum Tax', artist: 'Paste' },
    { name: 'Insanity Maxxing', artist: 'fluf' },
    { name: 'Skibidi Toilet', artist: 'Mohan Dong' },
    { name: 'Fanum Tax', artist: 'Paste' },
    { name: 'Insanity Maxxing', artist: 'fluf' },
]

// simulate fetching user data
const fetchUserData = async (): Promise<UserData> => {
    await new Promise(res => setTimeout(res, 2000));
    return {
        name: 'Mohan Dong',
        remaining: 69,
        students: 10,
        items: 10,
        artworks: testArtworks.map((e) => ({
            ...e,
            medium: 'Example Medium',
            creationDate: new Date('2024-12-11'),
            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas perferendis rerum id accusamus nihil, quidem nemo aliquid cupiditate, beatae quis nostrum et inventore debitis alias nisi ducimus? Nesciunt, asperiores obcaecati!',
            dimension: { h:6, w:9 },
            image: new URL('https://picsum.photos/1920/1920'),
            id: 'example-id'
        }))
    };
}

export default function Page() {

    const [ greeting, setGreeting ] = useState<string|undefined>();
    const [ userData, setUserData ] = useState<UserData|undefined>();
    const [ creationDate, setCreationDate ] = useState(new Date('2025-01-01'));

    useEffect(() => { (async () => {
        const data = await fetchUserData();

        setUserData(data);

         const hour = new Date().getHours();

        if (hour < 12) {
            setGreeting('Good morning');
        } else if (hour < 18) {
            setGreeting('Good afternoon');
        } else {
            setGreeting('Good evening');
        }
    })(); }, [])


    return (
        <div className="flex flex-col gap-40 flex-1">
            <div className="w-full flex flex-row gap-20">
                <SkeletonImage src="https://picsum.photos/1500/1080" className="aspect-[25/18] w-1/2" alt="placeholder image" useHtmlImg />
                <div className="flex flex-col gap-2 justify-end w-1/2 pr-30">
                    { userData && greeting ? (<>
                            <span className="text-5xl font-roboto font-bold animate-fade-in">{greeting}, {userData.name}</span>
                            <p className="font-inter my-2 animate-fade-in">There are {userData.remaining} days until the exhibition</p>
                            <p className="font-inter my-2 animate-fade-in">You have added {userData.students} students, who have submitted a total of {userData.items} items</p>
                        </>) : (<>
                            <Skeleton className="h-[5rem] w-[70%]" />
                            <Skeleton className="h-[3rem] w-[40%]" />
                            <Skeleton className="h-[3rem] w-[60%]" />
                        </>)

                    }
                </div>
            </div>


            <div className="flex flex-col gap-14 px-40">
                <span className="text-5xl font-roboto font-medium">Artworks</span>
                <div className="grid grid-cols-[repeat(auto-fit,30rem)] justify-center gap-10">
                    <AddArtworkButton onClick={()=>{}} />
                    <DatePicker date={creationDate} onSelect={(d)=>{if(d) setCreationDate(d)}} toggleButton={<Button className="w-10">Button</Button>} />
                    { userData ? 
                        userData.artworks.map((art, i) => <ArtworkItem key={i} onClick={()=>{}} artwork={art} />)
                        : 
                        Array.from({length:6}).map((_,i) => <ArtworkSkeleton key={i} />) 
                    }
                </div>
            </div>
        </div>
    )
}

function AddArtworkButton({ onClick }: { onClick:()=>void }) {
    return (
        <div className="relative justify-between aspect-[1/1] border-3 border-black" onClick={onClick} >
            {/* idk how to make a cross so enjoy this horribly made one using borders */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-l-3 w-0 h-24 border-black" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-t-3 w-24 h-0 border-black" />
        </div>
    )
}

function ArtworkItem({ artwork, onClick }: { artwork: Artwork, onClick:()=>void }) {
    return (
        <div className="flex flex-col justify-between aspect-[1/1] animate-fade-in">
            { /* using <img> as placeholder for now, switch to next/image once actually hooked up to the blob storage */ }
            <SkeletonImage className="w-full h-2/3 object-cover" src={artwork.image.toString()} useHtmlImg />
            <div className="flex flex-col gap-2">
                <span className="font-roboto text-2xl">{artwork.name}</span>
                <span className="font-inter text-lg">By {artwork.artist}</span>
            </div>
            <EditDialog artwork={artwork} submit={()=>{}} 
                openButton={<Button className="p-6 w-full font-bold mx-auto" onClick={onClick}>MANAGE ARTWORK</Button>} 
            />
        </div>
    )
}



function ArtworkSkeleton() {
    return (
        <div className="flex flex-col justify-between aspect-[1/1]">
            { /* using <img> as placeholder for now, switch to next/image once actually hooked up to the blob storage */ }
            <Skeleton className="w-full h-2/3" />
            <div className="flex flex-col gap-2">
                <Skeleton className="h-[2rem] w-[70%]" />
                <Skeleton className="h-[1rem] w-[40%]" />
            </div>
            <Skeleton className="p-6 h-[3.5rem] w-full font-bold mx-auto" />
        </div>
    )
}
