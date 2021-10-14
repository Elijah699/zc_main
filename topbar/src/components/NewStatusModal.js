import React, { useState, useContext } from "react"
import { Picker } from "emoji-mart"
import ReactTooltip from "react-tooltip"
import DatePicker from "react-datepicker"
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import TimePicker from "react-time-picker"
import styles from "../styles/SetStatusModal.module.css"
import "../timepicker.css"
import { authAxios } from "../utils/Api"
import blackx from "../assets/images/blackx.svg"
import whitex from "../assets/images/whitex.svg"
import down from "../assets/images/down.svg"
import smile from "../assets/images/smile.png"
import { ProfileContext } from "../context/ProfileModal"
import { TopbarContext } from "../context/Topbar"
import { StyledEmojiWrapper } from "../styles/EmojiMartStyle"

const SetDateAndTime = ({ dateTime, setDateTime }) => {
  const [value, onChange] = useState(new Date())
  const [timevalue, timeChange] = useState("10:00")
  //

  return (
    <>
      <div className={styles.modal}>
        <div className={styles.modalcontainer}>
          <div className={styles.statustop}>
            <p>Clear after</p>
            <img
              src={whitex}
              alt=""
              onClick={() => setDateTime(!dateTime)}
              className={styles.whitex}
            />
          </div>
          <form>
            <div className={styles.dateSection}>
              <label className={styles.dateLabel}>Date</label>
              <DatePicker onChange={onChange} value={value} />
            </div>
            <div>
              <label>Time</label>
              <TimePicker onChange={timeChange} value={timevalue} />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

const SetStatusModal = ({
  statusModal,
  setStatusModal,
  emojiItem,
  text,
  setText,
  setEmoji
}) => {
  const [dropdown, setDropdown] = useState(false)
  const [openEmoji, setOpenEmoji] = useState(false)
  const [dateTime, setDateTime] = useState(false)
  const [choosePeriod, setChoosePeriod] = useState({
    label: "Don't clear",
    value: "dont_clear"
  })
  const { user, orgId, setUser } = useContext(ProfileContext)
  const [statusEmoji, setStatusEmoji] = useState(user?.status?.tag)
  const [statusText, setStatusText] = useState(user?.status?.text)
  const [dateState, setDateState] = useState(
    new Date().toISOString().slice(0, -14)
  )
  const [timeState, setTimeState] = useState(getTime())

  const onEmojiSelect = selectedEmoji => {
    setStatusEmoji(selectedEmoji.native)
    setOpenEmoji(!openEmoji)
  }
  //
  const getTime = () => {
    let d = new Date()
    let h = d.getHours(),
      m = d.getMinutes()
    if (h > 12) {
      h = h - 12
    }
    if (h < 10) {
      h = "0" + h
    }
    if (m < 10) {
      m = "0" + m
    }

    return h + ":" + m
  }
  const currentTime = getTime()
  //
  const changeDateHandler = () => {}
  const changeTimeHandler = () => {}
  //
  const handleSubmit = e => {
    e.preventDefault()

    setUser({
      ...user,
      status: {
        text: statusText,
        tag: statusEmoji,
        expiry_time: choosePeriod.value
      }
    })

    try {
      const res = authAxios.patch(
        `/organizations/${user.org_id}/members/${user._id}/status`,
        {
          expiry_time: choosePeriod.value,
          tag: statusEmoji,
          text: statusText
        }
      )
    } catch (error) {
      const errorResponse = error
    }

    setStatusModal(!statusModal)
  }

  const handleClearStatus = async () => {
    setUser({
      ...user,
      status: {
        text: "",
        tag: "",
        expiry_time: ""
      }
    })

    setStatusText("")
    setStatusEmoji("")

    try {
      const res = await authAxios.patch(
        `/organizations/${orgId}/members/${user._id}/status`,
        {
          expiry_time: "one_hour",
          tag: "",
          text: ""
        }
      )
      const response = res.status
    } catch (error) {
      const errorResponse = error
    }

    setStatusModal(!statusModal)
  }
  return (
    <div className={styles.modal}>
      <div className={styles.modalcontainer}>
        <div className={styles.statustop}>
          <p>Set a status</p>
          <img
            src={whitex}
            alt=""
            onClick={() => setStatusModal(!statusModal)}
            className={styles.whitex}
          />
        </div>
        <div className={styles.modalcontent}>
          <form action="" method="post">
            <div className={styles.addstatus}>
              <div className={styles.addstatusleft}>
                <p
                  className={styles.chosenemoji}
                  onClick={() => setOpenEmoji(!openEmoji)}
                >
                  {statusEmoji || (
                    <img src={smile} className={styles.defalutEmoji} />
                  )}
                </p>
                <div className={styles.emoji}>
                  <StyledEmojiWrapper>
                    {openEmoji ? (
                      <Picker
                        set="google"
                        title="pick an emoji..."
                        emoji="point_up"
                        onSelect={onEmojiSelect}
                      />
                    ) : null}
                  </StyledEmojiWrapper>
                  <div>
                    {openEmoji ? (
                      <img
                        src={blackx}
                        alt=""
                        onClick={() => {
                          setOpenEmoji(!openEmoji)
                        }}
                        className={styles.emojiclose}
                      />
                    ) : null}
                  </div>
                  {openEmoji && (
                    <div
                      className={styles.emojiback}
                      onClick={() => setOpenEmoji(!openEmoji)}
                    ></div>
                  )}
                </div>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="What is your status?"
                  value={statusText}
                  onChange={e => setStatusText(e.target.value)}
                />
              </div>
              <img
                src={blackx}
                onClick={() => {
                  setStatusText("")
                  setStatusEmoji("")
                }}
                alt="clear status"
                role="button"
                className={styles.blackx}
                data-tip
                data-for="clearstatus"
              />
              <ReactTooltip id="clearstatus" type="dark" effect="solid">
                <span>Clear all</span>
              </ReactTooltip>
            </div>
            <div className={styles.clearafter}>
              <div
                className={styles.clearaftertop}
                onClick={() => setDropdown(!dropdown)}
              >
                <label htmlFor="" className={styles.dropdowntop}>
                  Clear after: &nbsp;
                  <span className={styles.dropdowntopspan}>
                    {choosePeriod.label}
                  </span>
                </label>
                <img src={down} alt="" />
              </div>
              {dateTime ? (
                // <SetDateAndTime
                //   setDateTime={setDateTime}
                //   dateTime={dateTime}
                // />
                <div className={styles.datetime}>
                  <input
                    type="date"
                    className={styles.date}
                    defaultValue={dateState}
                    min={dateState}
                    onChange={changeDateHandler}
                  />
                  <input
                    type="time"
                    className={styles.time}
                    defaultValue={timeState}
                    min={timeState}
                    onChange={changeTimeHandler}
                  />
                </div>
              ) : null}
              <div>
                {dropdown && (
                  <ul
                    className={styles.dropdown}
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <li
                      className={styles.dropdownoption}
                      onClick={() =>
                        setChoosePeriod({
                          label: "Don't clear",
                          value: "dont_clear"
                        })
                      }
                    >
                      Don't clear
                    </li>
                    <li
                      className={styles.dropdownoption}
                      onClick={() =>
                        setChoosePeriod({ label: "1 hour", value: "one_hour" })
                      }
                    >
                      1 hour
                    </li>

                    <li
                      className={styles.dropdownoption}
                      onClick={() =>
                        setChoosePeriod({
                          label: "4 hours",
                          value: "four_hours"
                        })
                      }
                    >
                      4 hours
                    </li>
                    <li
                      className={styles.dropdownoption}
                      onClick={() =>
                        setChoosePeriod({ label: "Today", value: "today" })
                      }
                    >
                      Today
                    </li>
                    <li
                      className={styles.dropdownoption}
                      onClick={() =>
                        setChoosePeriod({
                          label: "This week",
                          value: "this_week"
                        })
                      }
                    >
                      This week
                    </li>
                    <li
                      className={styles.dropdownoption2}
                      onClick={() => setDateTime(!dateTime)}
                    >
                      Set date and time
                    </li>
                  </ul>
                )}
              </div>
            </div>
            {(user?.status?.tag !== statusEmoji ||
              user?.status?.text !== statusText) && (
              <button
                className={styles.statuscta}
                type="submit"
                onClick={handleSubmit}
              >
                Save Changes
              </button>
            )}
            {user?.status?.tag === statusEmoji &&
              user?.status?.text === statusText &&
              (statusEmoji !== "" || statusText !== "") && (
                <span
                  onClick={handleClearStatus}
                  className={styles.clearstatus}
                >
                  Clear Status
                </span>
              )}
            {user?.status?.tag === statusEmoji &&
              statusEmoji === "" &&
              user?.status?.text === statusText &&
              statusText === "" && (
                <span className={styles.inactivesave}>Save Changes</span>
              )}
          </form>
          {/* {status.map((data)=>{
                      const {text, emoji} = data;
                      return(
                          <div>
                          <p>{text}</p>
                          <p>{emoji}</p>
                          </div>
                      )
                  })} */}
        </div>
      </div>
      <div
        className={styles.modalback}
        onClick={() => setStatusModal(!statusModal)}
      ></div>
    </div>
  )
}

export default SetStatusModal
