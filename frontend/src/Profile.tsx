import { Button, Checkbox, Label, TextInput, Textarea } from "flowbite-react";

const Profile = () => {
  const handleSubmit = () => {
    return;
  };

  return (
    <>
      <div className="w-full m-10 h-screen">
        <div className="w-full bg-gray-100 shadow-md rounded-md p-8">
          <div className="text-2xl mb-5 font-semibold">Company Metrics</div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label className="font-semibold" htmlFor="profile1" value="Company Name" />
              </div>
              <TextInput
                id="profile1"
                name="profile1"
                type="text"
                placeholder="Company Name"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label className="font-semibold" htmlFor="profile2" value="Company Email" />
              </div>
              <TextInput
                id="profile2"
                name="profile2"
                type="email"
                placeholder="Company Email"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label className="font-semibold" htmlFor="profile3" value="Company Location" />
              </div>
              <TextInput
                id="profile3"
                name="profile3"
                type="text"
                placeholder="Company Location"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label className="font-semibold" htmlFor="profile4" value="Company Description" />
              </div>
              <Textarea
                id="profile4"
                name="profile4"
                type="text"
                placeholder="Company Description"
                required
              />
            </div>
           


          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
