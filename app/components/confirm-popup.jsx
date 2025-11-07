"use client";

import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { Trash, Loader } from "lucide-react";

export function ConfirmPopup({ isOpen, setIsOpen, handleClick, loading }) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none"
        onClose={() => setIsOpen(false)}
        __demoMode
      >
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md border border-gray-200 rounded-xl shadow-2xl bg-white p-6 duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
            >
              <DialogTitle as="h1" className="text-xl font-semibold ">
                Are you absolutely sure?
              </DialogTitle>
              <p className="mt-2 text-sm/6">
                This action cannot be undone. This will permanently your data.
              </p>
              <div className="mt-4 flex items-center justify-between">
                <Button
                  className="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm/6 font-semibold shadow-sm drop-shadow-2xl"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 text-white px-3 py-1.5 text-sm/6 font-semibold shadow-sm drop-shadow-2xl"
                  onClick={handleClick}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin h-4 w-4" /> Loading...
                    </>
                  ) : (
                    <>
                      <Trash className="h-4 w-4" /> Delete
                    </>
                  )}
                </Button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
