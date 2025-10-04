import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // Bước 1: Đọc header Authorization để verify API Key
    const authHeader = request.headers.get("Authorization");
    console.log("authHeader+++", authHeader);
    if (!authHeader || authHeader !== `Apikey ${process.env.SEPAY_API_KEY}`) {
      console.error("Invalid API Key in Authorization header");
      return NextResponse.json(
        { error: "Unauthorized: Invalid API Key" },
        { status: 401 }
      );
    }

    // Bước 2: Đọc payload JSON từ request body (dựa trên tài liệu SePay)
    const payload = await request.json();
    console.log("Webhook payload từ SePay:", payload); // Log để debug (xóa khi production)
    // Bước 3: Xử lý payload
    const {
      id,
      gateway,
      transactionDate,
      accountNumber,
      code,
      transferAmount,
    }: ResponseFromSepay = payload;
    return NextResponse.json(
      { message: "Webhook received and processed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

interface ResponseFromSepay {
  gateway?: string; // Ngân hàng, ví dụ: VietinBank
  transactionDate: string; // Thời gian giao dịch
  accountNumber: string; // Số tài khoản
  subAccount?: string; // Tiểu khoản
  code?: string | null; // Mã (có thể null)
  content?: string; // Nội dung giao dịch
  transferType?: "in" | "out"; // Loại giao dịch
  description?: string; // Mô tả
  transferAmount: number; // Số tiền
  referenceCode: string; // Mã tham chiếu
  accumulated?: number; // Số dư tích lũy
  id: number;
}
