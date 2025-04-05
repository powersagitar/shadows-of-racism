import Logo from "@/components/ui/logo";

const placeholder =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius";

export default function Page() {
  return (
    <div className="font-inter flex flex-row justify-between gap-10">
      <div className="w-1/2">
        {/* Placeholder image */}
        <img src="https://picsum.photos/1080/1080" alt="placeholder image" />
      </div>
      <div className="flex w-1/2 flex-col justify-end gap-2">
        <Logo size="70px" />
        <p className="font-inter mr-16 h-auto w-fit text-left">{placeholder}</p>
      </div>
    </div>
  );
}
