import { useMutation } from 'react-query';

import {
  duplicateId,
  duplicateNickname,
  duplicateEmail,
} from '../../modules/api/userInfoApi';

export const useDuplicateCheck = () => {
  // 아이디 중복 확인
  const checkDuplicateId = useMutation(duplicateId);
  // 닉네임 중복 확인
  const checkDuplicateNickname = useMutation(duplicateNickname);
  // 이메일 중복 확인
  const checkDuplicateEmail = useMutation(duplicateEmail);
  return { checkDuplicateId, checkDuplicateNickname, checkDuplicateEmail };
};
