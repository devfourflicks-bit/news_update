import React from "react";
import { X, User, Sliders, Shield, Bell } from "lucide-react";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  userEmail = "deepakravik2000@gmail.com"
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden border border-[#e2e2e2] relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#5f5e5e] hover:text-[#1a1c1c] p-1.5 rounded-full hover:bg-[#e2e2e2] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 border-b border-[#e2e2e2] bg-[#f9f9f9] flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#1a1c1c] text-white flex items-center justify-center font-serif font-bold text-lg">
            KL
          </div>
          <div>
            <h3 className="font-serif font-bold text-base text-[#1a1c1c]">
              Kinetic Reader Profile
            </h3>
            <p className="text-xs text-[#5f5e5e] font-mono">
              {userEmail}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between p-3 bg-[#f3f3f3] rounded-xl border border-[#e2e2e2]">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#bc000b]" />
              <div>
                <span className="text-xs font-bold text-[#1a1c1c] block">
                  Subscription Tier
                </span>
                <span className="text-[11px] text-[#5f5e5e]">
                  Pro Intelligence Member
                </span>
              </div>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-xs">
              ACTIVE
            </span>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#5f5e5e] mb-2">
              Reader Preferences
            </h4>

            <div className="flex justify-between items-center py-2 border-b border-[#eeeeee]">
              <span className="text-xs text-[#1a1c1c] font-medium">Article Font Size</span>
              <select className="text-xs bg-[#f9f9f9] border border-[#e2e2e2] rounded-lg px-2.5 py-1 focus:outline-none">
                <option>Medium (Default)</option>
                <option>Large (Reading Mode)</option>
                <option>Compact</option>
              </select>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-[#eeeeee]">
              <span className="text-xs text-[#1a1c1c] font-medium">Breaking News Alerts</span>
              <input type="checkbox" defaultChecked className="accent-[#bc000b]" />
            </div>

            <div className="flex justify-between items-center py-2 border-b border-[#eeeeee]">
              <span className="text-xs text-[#1a1c1c] font-medium">Sub-Second Market Feed</span>
              <input type="checkbox" defaultChecked className="accent-[#bc000b]" />
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-4 bg-[#1a1c1c] text-white text-xs font-bold py-2.5 rounded-xl hover:bg-[#bc000b] transition-colors cursor-pointer"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
