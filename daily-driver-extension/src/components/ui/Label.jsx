/* eslint-disable react/prop-types */
function Label({ children, className, props }, ref) {
  return (
    <label
      ref={ref}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-2 py-1 text-md ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

export default Label;
