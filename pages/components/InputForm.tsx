import React, { useRef, useState, } from "react";
import { Message } from "../../types/custom";

type InputFormProps = {
  onSubmit: (message: Message) => Promise<void>; // onSUbmit関数は親コンポーネントで提供され、ユーザーがメッセージを送信すると呼び出される
};

const InputForm = ({ onSubmit }: InputFormProps) => {
  // input要素への参照を作成
  const inputMyRef = useRef<HTMLInputElement>(null);
  const inputYourRef = useRef<HTMLInputElement>(null);
  const inputMessageRef = useRef<HTMLInputElement>(null);
  const [inputVisible, setInputVisible] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // input要素から直接値を取得
    const inputMyProfile = inputMyRef.current?.value;
    const inputYourProfile = inputYourRef.current?.value;
    const inputMessage = inputMessageRef.current?.value;

    if (inputMyProfile && inputYourProfile) {
      // 親コンポーネントから提供されたonSubmit関数を介して送信されたメッセージを処理
      onSubmit({
        role: "user",
        content: `# 私のプロフィール \n ${inputMyProfile}\n\n# 相手のプロフィール \n ${inputYourProfile}`,
      });
      inputMyRef.current.value = "";
      inputYourRef.current.value = "";
      setInputVisible(false);
    } else if(inputMessage){
        onSubmit({
            role: "user",
            content: inputMessage,
        });
        inputMessageRef.current.value = "";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="items-center p-4 border-t border-gray-200"
    >
    {inputVisible &&
      <input
        type="text"
        ref={inputMyRef}
        className="w-full flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        placeholder="自分のプロフィールをコピペ"
      />
    }
    {inputVisible &&
      <input
        type="text"
        ref={inputYourRef}
        className="w-full flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        placeholder="相手のプロフィールをコピペ"
      />
    }
    {!inputVisible &&
      <input
        type="text"
        ref={inputMessageRef}
        className="w-full flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        placeholder="相手のメッセージをコピペ"
      />
    }
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg focus:outline-none focus:ring focus:border-blue-300"
      >
        送信
      </button>
    </form>
  );
};

export default InputForm;