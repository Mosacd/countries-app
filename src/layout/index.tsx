import { PropsWithChildren } from "react"
import Header from "#/header"


const Layout:React.FC<PropsWithChildren> = ({children}) => {

return(
    <>
    <Header/>
    {children}
    </>
)

}

export default Layout;