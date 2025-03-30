import { IconProps } from "./types";

export default function InstagramIcon({ className = "" }: IconProps) {
    return (
        <svg
            className={className}
            viewBox="0 0 33 33"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M10.8804 3.11414H22.0856C26.3542 3.11414 29.8225 6.5824 29.8225 10.851V22.0562C29.8225 24.1081 29.0074 26.076 27.5564 27.527C26.1055 28.9779 24.1375 29.7931 22.0856 29.7931H10.8804C6.61182 29.7931 3.14355 26.3248 3.14355 22.0562V10.851C3.14355 8.79908 3.95869 6.83117 5.40964 5.38022C6.86059 3.92927 8.82849 3.11414 10.8804 3.11414ZM10.6137 5.78203C9.34003 5.78203 8.11857 6.28797 7.21798 7.18856C6.31739 8.08915 5.81145 9.31061 5.81145 10.5842V22.323C5.81145 24.9775 7.9591 27.1252 10.6137 27.1252H22.3524C23.626 27.1252 24.8475 26.6192 25.7481 25.7186C26.6486 24.8181 27.1546 23.5966 27.1546 22.323V10.5842C27.1546 7.92968 25.0069 5.78203 22.3524 5.78203H10.6137ZM23.4862 7.78295C23.9285 7.78295 24.3526 7.95862 24.6653 8.27133C24.978 8.58403 25.1537 9.00815 25.1537 9.45038C25.1537 9.89261 24.978 10.3167 24.6653 10.6294C24.3526 10.9421 23.9285 11.1178 23.4862 11.1178C23.044 11.1178 22.6199 10.9421 22.3072 10.6294C21.9945 10.3167 21.8188 9.89261 21.8188 9.45038C21.8188 9.00815 21.9945 8.58403 22.3072 8.27133C22.6199 7.95862 23.044 7.78295 23.4862 7.78295ZM16.483 9.78387C18.2519 9.78387 19.9484 10.4866 21.1992 11.7374C22.4501 12.9882 23.1528 14.6847 23.1528 16.4536C23.1528 18.2225 22.4501 19.919 21.1992 21.1698C19.9484 22.4206 18.2519 23.1233 16.483 23.1233C14.7141 23.1233 13.0176 22.4206 11.7668 21.1698C10.516 19.919 9.81329 18.2225 9.81329 16.4536C9.81329 14.6847 10.516 12.9882 11.7668 11.7374C13.0176 10.4866 14.7141 9.78387 16.483 9.78387ZM16.483 12.4518C15.4217 12.4518 14.4038 12.8734 13.6533 13.6239C12.9028 14.3744 12.4812 15.3922 12.4812 16.4536C12.4812 17.515 12.9028 18.5328 13.6533 19.2833C14.4038 20.0338 15.4217 20.4554 16.483 20.4554C17.5444 20.4554 18.5623 20.0338 19.3127 19.2833C20.0632 18.5328 20.4849 17.515 20.4849 16.4536C20.4849 15.3922 20.0632 14.3744 19.3127 13.6239C18.5623 12.8734 17.5444 12.4518 16.483 12.4518Z"
                fill="#828282"
            />
        </svg>
    );
}
