import Image from "next/image";

export default function UserAvatar({ user }: any) {
  const getInitials = (name: string) => {
    if (!name) return "??";

    const words = name.trim().split(/\s+/);

    if (words.length === 1) {
      return words[0].slice(0, 2).toUpperCase();
    }

    return (words[0][0] + words[words.length - 1][0]).toUpperCase();
  };

  if (user.image) {
    return (
      <Image
        src={user.image}
        alt={user.name}
        width={36}
        height={36}
        className="rounded-full"
      />
    );
  }

  return (
    <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
      {getInitials(user.name)}
    </div>
  );
}