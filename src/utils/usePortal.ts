import { useMemo } from "react";
import { createHtmlPortalNode } from "react-reverse-portal";

export default function useModalPortal() {
    const portalNode = useMemo(() => {
        if (typeof window === "undefined") {
            return null;
        }
        return createHtmlPortalNode({
            attributes: {
                style: "position: absolute; top: 0; left: 0;"
            }
        });
    }, [])

    return portalNode;
}