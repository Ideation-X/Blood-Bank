import { NextRequest, NextResponse } from "next/server";
import { authenticateUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

// save medical history of donor.

export async function POST(
	req: NextRequest,
	{ params }: { params: { donorId: string } }
) {
	try {
        const userId = await auth();
        const { conditions, medications } = await req.json();

        if (!userId) {
            return new NextResponse ("UnAuthenticated",  { status: 401 });
        }       

        if (!params.donorId) {
            return new NextResponse ("Donor Id is required!",  { status: 400 });
        }

        if (!conditions) {
            return new NextResponse ("Medical Conditions are required!",  { status: 400 });
        }
        if (!medications) {
            return new NextResponse ("Medical Medications are required!",  { status: 400 });
        }

        const medicalHistory = await prisma.medicalHistory.create({
            data: {
                conditions,
                medications,
                donorId: params.donorId
            }
        });
        return NextResponse.json(medicalHistory,  { status: 201 });

	} catch (error) {
		console.error("MEDICAL_HISTORY_POST", error);
        return NextResponse.json(
            { error: "Failed to Create Medical History" },
            { status: 500 }
        );
	}
}



