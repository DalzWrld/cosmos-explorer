export function OrbitLoader({ label = "Loading" }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-dust">
      <p className="text-sm">{label}&hellip;</p>
    </div>
  )
}