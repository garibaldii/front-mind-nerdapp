import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

type Props = {
    imageUrl: string,
    alt: string
}

export function AvatarPhoto({ imageUrl, alt }: Props) {
    return (
        <Avatar>
            <AvatarImage src={imageUrl} alt={alt} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
