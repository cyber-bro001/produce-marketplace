import { useAuth } from "../context/useAuth";
import { User, Mail, Phone, ShieldCheck } from "lucide-react";

function Profile() {
  const { user } = useAuth();

  if (!user) return null;

  const fields = [
    { icon: <User size={18} />, label: "Full Name", value: user.name },
    { icon: <Mail size={18} />, label: "Email", value: user.email },
    { icon: <Phone size={18} />, label: "Phone", value: user.phone ?? "—" },
    {
      icon: <ShieldCheck size={18} />,
      label: "Account Type",
      value: user.role.charAt(0).toUpperCase() + user.role.slice(1),
    },
  ];

  return (
    <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>
          Your account information.
        </p>
      </div>

      {/* Avatar */}
      <div className="mb-6 flex items-center gap-4">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full text-2xl font-bold text-white"
          style={{ background: "var(--primary)" }}
        >
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-semibold text-lg">{user.name}</p>
          <p className="text-sm capitalize" style={{ color: "var(--muted)" }}>
            {user.role}
          </p>
        </div>
      </div>

      <div
        className="divide-y rounded-[var(--radius-lg)] border"
        style={{
          background: "var(--surface)",
          borderColor: "var(--border)",
          "--divide-color": "var(--border)",
        } as React.CSSProperties}
      >
        {fields.map((field) => (
          <div
            key={field.label}
            className="flex items-center gap-4 px-6 py-4"
          >
            <span style={{ color: "var(--muted)" }}>{field.icon}</span>
            <div>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                {field.label}
              </p>
              <p className="font-medium">{field.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Profile;
