import * as AvatarRadix from "@radix-ui/react-avatar";

interface AvatarProps {
  imageUrl: string;
  name: string;
}

export function Avatar({ imageUrl, name }: AvatarProps) {
  return (
    <>
      <AvatarRadix.Root className="bg-blackA3 inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
        <AvatarRadix.Image
          src={imageUrl}
          alt={name}
          className="h-full w-full rounded-[inherit] object-cover"
        />
        <AvatarRadix.Fallback className="text-violet11 leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium">
          {name
            .split(" ")
            .slice(0, 2)
            .map((v) => v.charAt(0).toUpperCase())}
        </AvatarRadix.Fallback>
      </AvatarRadix.Root>
    </>
  );
}
