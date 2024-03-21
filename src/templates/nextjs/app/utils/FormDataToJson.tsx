export default function formDataToJson(formData: FormData, list: any) {
    let data: any = {};
    list.map((e: string) => {
        if (formData.get(e) && formData.get(e) !== "") {
            data[e] = formData.get(e);
        }
    });

    return data;
}