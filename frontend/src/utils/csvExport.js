export const exportCSV = (expenses) => {

    const header =
        "Title,Category,Amount,Date\n";

    const rows = expenses.map(expense =>
        `${expense.title},${expense.category},${expense.amount},${expense.createdAt}`
    );

    const csv =
        header + rows.join("\n");

    const blob = new Blob(
        [csv],
        {
            type: "text/csv",
        }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download = "expenses.csv";

    link.click();

    URL.revokeObjectURL(url);

};