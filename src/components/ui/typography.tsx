// src/components/ui/typography.tsx
import React from 'react';
import { cn } from "@/lib/utils"; // Giả sử bạn có hàm cn để merge class (thường có trong shadcn/ui)
// Hoặc nếu không có hàm cn, bạn có thể dùng template literal đơn giản

export function TypographyBlockquote({ 
  children, 
  className 
}: { 
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <blockquote 
      className={cn(
        "mt-6 border-l-2 pl-6 italic", // Style gốc
        className // Class được truyền thêm vào để override
      )}
      // Nếu không dùng hàm cn thì viết: className={`mt-6 border-l-2 pl-6 italic ${className || ''}`}
    >
      {children}
    </blockquote>
  );
}