export function getImage(chat, user) {
    if (chat?.isGroupChat) return chat.groupPic;
    else {
        const newChat = chat?.user?.filter((data) => data.email !== user.email);
        return newChat?.[0]?.pic ?? "";
    }
}

export function getName(chat, user) {
    if (chat?.isGroupChat) return chat?.chatName;
    else {
        const newChat = chat?.user?.filter((data) => data?.email !== user?.email);
        return `${newChat?.[0]?.firstName ?? ""} ${newChat?.[0]?.lastName ?? ""}`;
    }
}

export function getTime(createdAt) {
    const now = new Date(createdAt);
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${hours}:${formattedMinutes}`;
}