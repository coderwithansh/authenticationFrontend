import { Check, X } from "lucide-react";

const PasswordCriteria = ({ password }) => {
    const criteria = [
        { label: "At least 6 characters", met: password.length >= 6 },
        { label: "Contain uppercase letter", met: /[A-Z]/.test(password) },
        { label: "Contain lowercase letter", met: /[a-z]/.test(password) },
        { label: "Contain a number", met: /\d/.test(password) },
        { label: "Contain special character", met: /[^A-Za-z0-9]/.test(password) },
    ];

    return (
        <div className="mt-2 space-y-1">
            {criteria.map((item) => (
                <div key={item.label} className="flex items-center text-xs">
                    {item.met ? (
                        <Check className="w-4 text-green-500 mr-2" />
                    ) : (
                        <X className="w-4 text-gray-400 mr-2" />
                    )}
                    <span className={item.met ? "text-green-500" : "text-gray-400"}>
                        {item.label}
                    </span>
                </div>
            ))}
        </div>
    );
};

const PasswordStrengthMeter = ({ password }) => {
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 6) strength++;
        if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) strength++;
        if (/\d/.test(pass)) strength++;
        if (/[^a-zA-Z\d]/.test(pass)) strength++;
        return strength;
    };

    const strength = getStrength(password);

    const getColor = (strength) => {
        if (strength === 0) return "bg-red-500";
        if (strength === 1) return "bg-red-400";
        if (strength === 2) return "bg-yellow-500";
        if (strength === 3) return "bg-yellow-400";
        return "bg-green-500";
    };

    const getStrengthText = (strength) => {
        if (strength === 0) return "Very Weak";
        if (strength === 1) return "Weak";
        if (strength === 2) return "Fair";
        if (strength === 3) return "Good";
        return "Strong";
    };

    return (
        <div className="mt-2">
            <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-500">Password Strength:</span>
                <span className="text-xs text-rose-500  bg-gradient-to-r from-red-600 to-blue-400 text-transparent bg-clip-text font-medium">{getStrengthText(strength)}</span>
            </div>
            <div className="flex space-x-1 mb-2">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 w-1/2 rounded-full transition-colors duration-300 
                            ${strength > index ? getColor(strength) : "bg-gray-300"}
                        `}
                    />
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    );
};

export default PasswordStrengthMeter;
