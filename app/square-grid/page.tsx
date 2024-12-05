const Page = () => {
  return (
    <div className='grid grid-cols-3 auto-rows-fr gap-3 w-[280px] p-3 mx-auto bg-red-100'>
      {Array.from({ length: 20 }).map((_, i) => (
        <img
          key={i}
          src='https://placehold.jp/80x80.png'
          alt=''
          className='size-full aspect-square'
        />
      ))}
    </div>
  );
};

export default Page;