export const ratingColor = (rating: number | undefined) => {
    if (rating!=undefined)
    return {backgroundColor : "hsl(" + rating + ", 90%, 61%)"};
    else return {};
}
