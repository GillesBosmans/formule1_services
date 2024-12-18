import { jsx as _jsx } from "react/jsx-runtime";
export default function LoadingSpinner() {
    return (_jsx("div", { className: "flex justify-center items-center h-32", children: _jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-b-2 border-red-600" }) }));
}
