

import Link from "next/link";
import Logo from "./logo";
import { auth } from "@clerk/nextjs/server";
import {
	ClerkProvider,
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
	useClerk
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { useState } from "react";
import UserAvtar from "./ui/UserAvtar";

const NavBar = async () => {
	const user = await auth();
	console.log(user);
	

	if (user.userId) {
	}

	const routes = [
		{
			href: `1`,
			label: "Why to Donate",
			// active: pathName === `/${params.storeId}`,
		},
		{
			href: `2`,
			label: "Donate",
			// active: pathName === `/${params.storeId}/billboards`,
		},
		{
			href: `3`,
			label: "About Us",
			// active: pathName === `/${params.storeId}/settings`,
		},
	];

	return (
		<header className="bg-[#f1f6ff] h-20 flex items-center  justify-between shadow-md">
			<div className="w-40 pl-10 flex items-center  h-full">
				<Logo />
			</div>
			<nav className={"flex-1 items-center space-x-4 lg:space-x-6"}>
				{routes.map((route) => (
					<Link
						key={route.href}
						href={route.href}
						className="text-[#072037] hover:text-red-500 font-medium"

						// className={
						// 	"text-xs font-semibold transition-colors hover:text-primary",
						// 	route.active
						// 		? "text-black dark:text-white"
						// 		: "text-muted-foreground"
						// )}
					>
						{route.label}
					</Link>
				))}
			</nav>
			<div className="flex  h-full items-center pr-12">
				{user.userId ? (
					<UserAvtar />
				) : (
					<div className="flex gap-3  h-9 items-center">
						<SignInButton>
							<Button
								variant="outline"
								className="border-red-500 text-red-500 font-medium hover:bg-red-500 hover:text-white"
							>
								Sign In
							</Button>
						</SignInButton>

						<Separator
							orientation="vertical"
							className="bg-red-300"
						/>

						<SignUpButton>
							<Button
								variant="outline"
								className="border-red-500 text-red-500 font-medium hover:bg-red-500 hover:text-white"
							>
								Register
							</Button>
						</SignUpButton>
					</div>
				)}
			</div>
		</header>
	);
};

export default NavBar;
