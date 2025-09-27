import { useRef } from "react";
import { CustomInput } from "./CustomInput";
import { Button } from "./Button";
import { BACKEND_URL } from "../../config";
import axios from "axios";


interface CreateContentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateContentModel = ({
  isOpen,
  onClose,
}: CreateContentModalProps) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  async function createEntry() {
    const token = localStorage.getItem("token");
    // console.log(token);
    // //@ts-ignore
    // console.log(titleRef.current.value)

    await axios.post(`${BACKEND_URL}/api/v1/content`,{
      "title":titleRef.current?.value,
      "link":linkRef.current?.value,
      "type":"Youtube"
    },
    {
    headers: {
      authorization:token
    }
  })
    alert("content added to db")
  }

  return (
    <>
      {isOpen && (
        <div
          id="create-content-modal"
          //   tabIndex={-1}
          //   aria-hidden={!isOpen}
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black/50"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add new Content
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  ✕<span className="sr-only">Close modal</span>
                </button>
              </div>

              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <CustomInput
                      ref={titleRef}
                      type="text"
                      placeholder="Enter Title"
                    />
                  </div>
                  <div className="col-span-2">
                    <CustomInput
                      ref={linkRef}
                      type="text"
                      placeholder="Enter Link to the reference"
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="primary"
                    size="md"
                    text="Create content"
                    onClick={createEntry}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
