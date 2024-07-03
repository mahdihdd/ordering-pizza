// import { Link } from "react-router-dom"

// export default function Button({children , disabled , to , type , onClick}) {
//   const base = "bg-yellow-400 text-sm uppercase font-semibold text-stone-800 inline-block tracking-wide rounded-full hover:bg-yellow-300 transition-colors duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-wait"
//   const styles = {
//     primary : base + "px-4 py-3 sm:px-6 sm:py-4",
//     small : base + "px-4 py-2 sm:px-5 sm:py-2.5 text-xs",
//     round : base + "px-2.5 py-1 md:px-3.5 md:py-2 text-sm",
//     secondary : "bg-transparent text-sm md:py-3.5 border-stone-300 border-2 uppercase font-semibold px-4 py-2.5  sm:px-6 sm:py-4 text-stone-400 inline-block tracking-wide rounded-full hover:bg-stone-300 transition-colors duration-300 hover:text-stone-800 focus:outline-none focus:bg-stone-300 focus:ring focus:ring-stone-300 focus:ring-offset-2 disabled:cursor-wait"

//   }
  
//   if(to) return <Link to={to} className={styles[type]}>{children}</Link>
//   if(onClick) return <button disabled ={disabled} onClick={onClick} className={styles[type]}>{children}</button>
//   return (
//     <button disabled ={disabled}  className={styles[type]}>{children}</button>
//   )
// }
import { Link } from 'react-router-dom';

function Button({ children, disabled, to, type, onClick }) {
  const base =
    'inline-block text-sm rounded-full bg-yellow-400 font-semibold uppercase tracking-wide text-stone-800 transition-colors duration-300 hover:bg-yellow-300 focus:bg-yellow-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-2 disabled:cursor-not-allowed';

  const styles = {
    primary: base + ' px-4 py-3 md:px-6 md:py-4',
    small: base + ' px-4 py-2 md:px-5 md:py-2.5 text-xs',
    round: base + ' px-2.5 py-1 md:px-3.5 md:py-2 text-sm',
    secondary:
      'inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5',
  };

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  if (onClick)
    return (
      <button onClick={onClick} disabled={disabled} className={styles[type]}>
        {children}
      </button>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;