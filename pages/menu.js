import Link from "next/link";

function Menu() {
    return (
        <div className="">
            <h2>Menu</h2>
            <Link href="/products">
                Go to Search Page
            </Link>
        </div>
    )
}

export default Menu;