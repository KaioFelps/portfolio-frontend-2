export function FormSkeleton() {
  return (
    <div className="flex w-1/2 gap-4">
      <div className="input leading-8 w-2/3 animate-pulse select-none">
        &nbsp;
      </div>

      <div className="input leading-8 w-1/3 animate-pulse select-none">
        &nbsp;
      </div>
    </div>
  );
}
