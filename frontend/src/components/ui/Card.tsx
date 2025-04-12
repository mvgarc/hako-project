import { cn } from '../../lib/utils';
import * as React from "react";

type CardProps = Readonly<React.HTMLAttributes<HTMLDivElement>>;

export function Card({ className, ...props }: CardProps) {
    return (
        <div
        className={cn(
            "rounded-2xl border bg-white shadow-sm p-4 dark:bg-gray-900 dark:border-gray-800",
            className
        )}
        {...props}
        />
    );
}

export function CardHeader({ className, ...props }: CardProps) {
    return <div className={cn("mb-2", className)} {...props} />;
}

export function CardTitle({ className, ...props }: CardProps) {
    return (
        <h3
        className={cn(
            "text-lg font-semibold leading-none tracking-tight",
            className
        )}
        {...props}
        >
            {props.children || "Default Title"}
        </h3>
    );
    }

    export function CardContent({ className, ...props }: CardProps) {
    return <div className={cn("text-muted-foreground", className)} {...props} />;
    }

    export function CardFooter({ className, ...props }: CardProps) {
    return <div className={cn("mt-4", className)} {...props} />;
    }
