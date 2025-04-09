import Logo from "@/components/ui/logo";
import SkeletonImage from "@/components/ui/skeletonimage";

const placeholder =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius";

export default function Page() {
  return (
<<<<<<< HEAD
    <div className="font-inter flex flex-row gap-10 justify-between">
      {/* Placeholder image */}
      <SkeletonImage
        src="https://picsum.photos/1500/1080"
        className="w-1/2 min-h-20"
        alt="placeholder image"
        useHtmlImg
      />
      <div className="flex flex-col gap-2 w-1/2 justify-end">
        <Logo size="5vw" />
        <p className="text-left font-inter h-auto w-fit mr-16 leading-normal">
          {placeholder}
        </p>
=======
    <div className="font-inter flex flex-row justify-between gap-10">
      <div className="w-1/2">
        {/* Placeholder image */}
        <img src="https://picsum.photos/1080/1080" alt="placeholder image" />
      </div>
      <div className="flex w-1/2 flex-col justify-end gap-2">
        <Logo size="70px" />
        <p className="font-inter mr-16 h-auto w-fit text-left">{placeholder}</p>
>>>>>>> d6677ab8faf0c11f7b761644f4f478b4bc12f749
      </div>
    </div>
  );
}
