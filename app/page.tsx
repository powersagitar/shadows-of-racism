import Logo from "@/components/ui/logo";

const placeholder =
  "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta ex autem id inventore consectetur, laborum culpa reiciendis sunt nam libero dignissimos eos dolorem placeat facere fugiat voluptas obcaecati asperiores eius";

export default function Page() {
  return (
    <div className="font-inter flex flex-row gap-10 justify-between">
      <div className="w-1/2">
        {/* Placeholder image */}
        <img src="https://picsum.photos/1080/1080" alt="placeholder image" />
      </div>
      <div className="flex flex-col gap-2 w-1/2 justify-end">
        <Logo size="70px" />
        <p className="text-left font-inter h-auto w-fit mr-16">{placeholder}</p>
      </div>
    </div>
  );
}
