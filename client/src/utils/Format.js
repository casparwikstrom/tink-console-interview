export const formatNumber = number => {
    parseFloat(number)
    return Math.trunc(number);
};

export const formatDate = date => {
    const month = date.getMonth() + 1;
    return (
        date.getFullYear() +
        "-" +
        month.toString().padStart(2, "0") +
        "-" +
        date.getDate()
    );
};
