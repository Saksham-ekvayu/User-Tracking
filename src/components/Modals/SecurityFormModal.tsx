import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SecurityFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  offerDetails: {
    id: number;
    title: string;
    price: string;
  };
}

export const SecurityFormModal = ({
  isOpen,
  onClose,
  offerDetails,
}: SecurityFormModalProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [showAlert, setShowAlert] = useState(false);

  const location = useLocation();

  const getOfferRoute = () => {
    if (location.pathname.includes("basic-security")) {
      return "basic-security";
    } else if (location.pathname.includes("advanced-protection")) {
      return "advanced-protection";
    } else if (location.pathname.includes("enterprise-shield")) {
      return "enterprise-shield";
    }
    return "/";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", { ...formData, offerDetails });
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Get Started with {offerDetails.title}</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-medium mb-2">
                  Selected Plan Details
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-medium">Offer Name</span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-primary">
                      {offerDetails.title}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-medium">
                      Offer Price
                    </span>
                    <span className="bg-primary/10 px-3 py-1 rounded-full text-primary">
                      ${offerDetails.price}/month
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-center">
                <button
                  onClick={() => setShowAlert(true)}
                  className="text-primary hover:text-primary/80 flex items-center gap-2 group transition-all duration-300 bg-primary/5 px-4 py-2 rounded-full"
                >
                  <span className="text-sm font-medium">
                    Skip & View full offer details
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={showAlert} onOpenChange={setShowAlert}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Are you sure you want to skip?</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>
              By skipping this form, you'll miss out on personalized security
              recommendations and exclusive offers.
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAlert(false)}>
              Stay Here
            </Button>
            <Link
              to={`/offers/${getOfferRoute()}/${offerDetails.id}`}
              className="bg-primary hover:bg-primary/80 text-white px-4 py-1 rounded-md"
            >
              Continue to Details
            </Link>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
