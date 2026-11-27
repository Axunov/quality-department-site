// Submitted form fields cannot override the anonymous option, even for direct API calls.
export function readAppealContact(form: FormData) {
  const value = (key: string, max: number) => {
    const input = form.get(key);
    return typeof input === "string" ? input.trim().slice(0, max) : "";
  };
  const anonymous = form.get("anonymous") === "true";
  return {
    anonymous,
    name: anonymous ? "" : value("name", 200),
    group: anonymous ? "" : value("group", 150),
    contactType: anonymous ? "" : value("contactType", 20),
    contactValue: anonymous ? "" : value("contactValue", 250),
  };
}
