import { PagesLayout } from "./PagesLayout";
import { Link } from "react-router-dom";
import { ExploreItemSkeleton } from "../components/ExploreItemSkeleton";
import { SearchPeaple } from "./SearchPeaple";
import { useState } from "react";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const FormSchema = z.object({
  username: z.string(),
});
type IFormInput = z.infer<typeof FormSchema>;
export const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const [formInput, setFormInput] = useState({
    username: "",
  });
  const [username, setUsername] = useState(String);
  const [showSearchPeaple, setShowSearchPeaple] = useState(false);
  const [componentKey, setComponentKey] = useState(0);
  const handleUserInput = (name: string, value: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const onSubmit = (data: IFormInput) => {
    setUsername(data.username);
    setComponentKey((prevKey) => prevKey + 1);
    setShowSearchPeaple(true);
    setTimeout(() => setShowSearchPeaple(true), 0);
  };

  return (
    <>
      <PagesLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-sm font-normal sticky z-50 top-[20px] mb-3">
            <label className="relative bg-white">
              <input
                className="rounded-[35px] border-white w-[360px] pl-10 pr-12"
                type="text"
                placeholder="جستجو در افراد، تگ‌ها، واژه‌ها و..."
                {...register("username")}
                value={formInput.username}
                onChange={({ target }) =>
                  handleUserInput(target.name, target.value)
                }
              />
              <button
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                type="submit"
              >
                <FontAwesomeIcon
                  className="text-black"
                  icon={faMagnifyingGlass}
                />
              </button>
            </label>
          </div>
        </form>
        <div className="w-full bg-inherit flex flex-col justify-center">
          <div className="text-md font-normal mt-6 justify-start flex">
            <Link to="/search-people">
              <button className=" ml-10">افراد </button>
            </Link>
            |
            <Link to="/search-tags">
              <button className="text-[#A5A5A5] mr-10">پست‌ها</button>
            </Link>
          </div>
          <div>
            <SearchPeaple key={componentKey} user={username} />
          </div>
        </div>
      </PagesLayout>
    </>
  );
};
