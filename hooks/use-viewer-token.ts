import { createViwerToken } from "@/actions/token";
import { useEffect, useState } from "react"
import { toast } from "sonner";
import { JwtPayload, jwtDecode } from 'jwt-decode';

export const useViwerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");

    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViwerToken(hostIdentity);
                setToken(viewerToken);

                const decodedToken = jwtDecode(viewerToken) as JwtPayload & {
                    name?: string;
                };

                const name = decodedToken?.name;
                const identity = decodedToken.jti;
                if (identity) {
                    setIdentity(identity);
                }
                if (name) {
                    setName(name);
                }
            } catch (error) {
                toast.error(`Something went Wrong!`);
            }
        }

        createToken();
    }, [hostIdentity])

    return {
        token,
        name,
        identity
    };
}