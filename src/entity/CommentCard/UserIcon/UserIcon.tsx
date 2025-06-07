import { UserAlt1SvgrepoCom } from 'assets/icons'
import './css.css'

interface UserIconProps {
    color: string;
}

export const UserIcon = ({ color }: UserIconProps) => {
    return (
        <div className='user-icon' style={{background: color}}>
            <UserAlt1SvgrepoCom> </UserAlt1SvgrepoCom>
        </div>

    )
}