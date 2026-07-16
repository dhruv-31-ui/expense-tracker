export const formatCurrency = amount =>

    new Intl.NumberFormat(
        "en-IN",
        {
            style: "currency",
            currency: "INR",
        }
    ).format(amount);

export const formatDate = date =>

    new Date(date).toLocaleDateString();