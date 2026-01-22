import i18n from "@/src/core/langs/config";

const UX_MESSAGES = {
    NO_FACE: 'no_face',
    MULTIPLE_FACES:'multiple_faces',
    FACE_TOO_SMALL:'face_too_small',
    FACE_NOT_CENTERED:'face_not_centered',
    GENERIC_ERROR:'generic_error',
  };

  export const generateMessage = (message: keyof typeof UX_MESSAGES) => {
    return i18n.t(UX_MESSAGES[message]);
  };